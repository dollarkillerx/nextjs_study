// 导入地理位置IP脚本
importScripts("assets/js/geoip.js");

// 获取扩展的manifest
var manifest = chrome.runtime.getManifest();

// DNS over HTTPS服务器列表
const doh_servers = [
    "https://223.5.5.5/resolve",
    "https://223.6.6.6/resolve"
];

// 允许通过的应用列表
const pass_apps = ["IDM Integration Module"];

// 默认API端点列表
var default_api = [
    'https://*.chrapi.com/api2',
    'https://*.cnsync.com:3228/api2',
    'https://*.gheapi.com/api2',
    'https://*.browserapi.net:5228/api2',
    'https://*.plebvps.com/api2'
];

var session = null;
var proxy_info = {};
var tester = {};

// 获取当前时间戳(秒)
function get_time() {
    var date = new Date();
    return (date.getTime() / 1000);
}

// 带超时的fetch请求
function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
    ]);
}

// URL编码查询参数
function urlencode(query) {
    var q = [];
    for (v in query) {
        q.push(v + '=' + escape(query[v]));
    }
    return q.join('&');
}

// 生成临时URL,替换*为UUID
function make_tmp_url(host) {
    host = host.replace("*", get_uuid());
    return host;
}

// 为URL列表生成临时URL
function build_api_urls(urls) {
    var new_api_urls = [];
    for (v in urls) {
        new_api_urls.push(make_tmp_url(urls[v]));
    }
    return new_api_urls;
}

// 构建API请求URL
function build_request_api_url(host, path = '', query = {}) {
    if (!host.startsWith("http://") && !host.startsWith("https://")) {
        host = "https://" + host;
    }
    var url = host + path;
    for (_ in query) {
        url = url + '?' + urlencode(query);
        break;
    }
    return url;
}

// 生成UUID
function get_uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 构建API查询参数
function build_api_query(query) {
    query['version'] = manifest.version;
    return query;
}

// 从DoH服务器异步获取API
function async_api_from_doh(domain) {
    for (val in doh_servers) {
        var url = doh_servers[val] + '?type=16&name=' + domain;
        setTimeout(function() {
            fetch(url, {mode: "cors", timeout: 5000}).then(function(req) {
                if (!req.ok) {
                    return;
                }
                req.json().then(function(r) {
                    var doh_apis = [];
                    for (i in r.Answer) {
                        var rurl = r.Answer[i].data;
                        rurl = rurl.replace('"', '').replace('"', '');
                        doh_apis.push(rurl);
                    }
                    var urls = doh_apis;
                    for (vl in default_api) {
                        urls.push(default_api[vl]);
                    }
                    chrome.storage.local.set({urls: build_api_urls(urls)});
                });
            }).catch(console.log);
        }, 1000);
    }
}

// 构建PAC脚本
function build_pac_script(conf) {
    if (!conf.hasOwnProperty('pac')) {
        return conf;
    }
    pac = conf.pac.value.pacScript.data;
    if (conf.hasOwnProperty('pac_encode') && conf.pac_encode == "base64") {
        pac = atob(atob(pac));
    }
    pac = pac.replace(/<cnips>/g, geoips);
    conf['pac']['value']['pacScript']['data'] = pac;
    return conf;
}

// 设置Chrome代理设置
function set_chrome_proxy_settings(conf) {
    if (typeof(conf) != 'object' || !conf.hasOwnProperty('pac')) {
        return console.log('can not proxy.pac data');
    }
    if (conf.pac.hasOwnProperty('value') && conf.pac.value.hasOwnProperty('pacScript') && conf.pac.value.pacScript.hasOwnProperty('data')) {
        conf = build_pac_script(conf);
    }
    if (conf.pac.hasOwnProperty('scope')) {
        chrome.proxy.settings.set(conf.pac, function(req) {
            chrome.storage.local.set({pac_key: conf.pk});
            console.log('set chrome proxy success.');
        });
    }
    if (conf.pac.value.hasOwnProperty('proxyType')) {
        browser.proxy.settings.set(conf.pac);
        chrome.storage.local.set({pac_key: conf.pk});
    }
}

// 设置Chrome设置
function set_chrome_settings(data) {
    if (typeof(data) != 'object' || !data.hasOwnProperty('session')) {
        return console.log('can not session data');
    }
    session = data.session;
    if (session.hasOwnProperty('proxy')) {
        chrome.storage.local.set({proxy: session.proxy});
        set_chrome_proxy_settings(session.proxy);
    }
    if (session.hasOwnProperty('tester')) {
        run_tester(session.tester);
    }
}

// 运行单个测试
function run_one_tester(row) {
    var st = get_time();
    fetchWithTimeout(row.ping_url, {mode: "cors", timeout: 5000}).then(function(req) {
        var ping_time = get_time() - st;
        tester[row.id] = {
            id: row.id,
            ping_time: ping_time,
            poster: row.poster,
            ping_adjust: row.ping_adjust
        };
        chrome.storage.local.set({tester: tester});
    }).catch(console.log);
}

// 运行测试
function run_tester(data) {
    if (typeof(data) != 'object' || data.length == 0) {
        return;
    }
    for (v in data) {
        run_one_tester(data[v]);
    }
}

// 异步获取会话
function async_session(cb, default_query = {}) {
    var keys = ["token", "urls", "tester"];
    chrome.storage.local.get(keys, function(data) {
        if (!data.hasOwnProperty("urls") || data.urls.length == 0) {
            data.urls = build_api_urls(default_api);
            chrome.storage.local.set({urls: data.urls});
        }
        if (!data.hasOwnProperty("tester")) {
            data.tester = {};
            chrome.storage.local.set({tester: {}});
        }
        if (data.hasOwnProperty("token")) {
            default_query["token"] = data.token;
        }
        var q = build_api_query(default_query);
        var url = build_request_api_url(data.urls.shift(), '/session', q);
        var query = {method: "POST"};
        query["headers"] = {};
        if (data.hasOwnProperty("token")) {
            query["headers"]["token"] = data.token;
        }
        query["headers"]["content-type"] = "application/json";
        query["headers"]["Pac-Encode"] = "base64";
        query["mode"] = "cors";
        if (data.hasOwnProperty("tester")) {
            query["body"] = JSON.stringify({tester: data.tester});
        }
        fetchWithTimeout(url, query).then((req) => {
            req.json().then(cb).catch(console.log);
        }).catch((err) => {
            if (data.urls.length == 0) {
                data.urls = build_api_urls(default_api);
                async_api_from_doh("v4.ghelper.net");
            }
            chrome.storage.local.set({urls: data.urls}).then((req) => {
                setTimeout(function() {
                    async_session(cb, default_query);
                }, 10000);
            });
        });
    });
}

// Chrome会话
function chrome_session() {
    console.log('start chrome session..');
}

// 处理消息
function handler_message(msg, sender, reply) {
    if (typeof(msg) !== 'object') {
        reply({error: 400});
    }
    if (msg.hasOwnProperty("path")) {
        var query = {};
        if (!msg.hasOwnProperty('urls') || msg.urls.length == 0) {
            if (msg.hasOwnProperty('urls') && msg.urls.length == 0) {
                async_api_from_doh("v2.ghelper.net");
            }
            msg.urls = build_api_urls(default_api);
            chrome.storage.local.set({urls: msg.urls});
        }
        if (msg.hasOwnProperty('token')) {
            query['token'] = msg.token;
        }
        if (msg.hasOwnProperty('pac_key')) {
            query['pk'] = msg.pac_key;
        }
        if (msg.hasOwnProperty('query')) {
            for (v in msg.query) {
                query[v] = msg.query[v];
            }
        }
        var req = {url: build_request_api_url(msg.urls[0], msg.path, build_api_query(query))};
        return reply(req);
    }
    if (msg.hasOwnProperty('session')) {
        set_chrome_settings({session: msg.session});
        var req = proxy_info;
        return reply(req);
    }
    if (msg.hasOwnProperty('async')) {
        async_session(set_chrome_settings);
    }
}

// 设置系统代理
function set_proxy_system() {
    var system_conf = {"scope": "regular", "value": {"mode": "system"}};
    chrome.proxy.settings.set(system_conf, function() {});
}

// 初始化Chrome代理
function chrome_proxy_init() {
    chrome.proxy.settings.get({'incognito': false}, function(config) {
        proxy_info['level_of_control'] = config.levelOfControl;
        proxy_info['proxy_mode'] = config.value.mode
    });
    chrome.storage.local.get(["proxy"], function(req) {
        if (!req.hasOwnProperty("proxy")) {
            return set_proxy_system();
        }
        set_chrome_proxy_settings(req.proxy);
    });
}

// 定时运行Chrome会话
function cron_chrome_session() {
    var delayInMinutes = 180;
    chrome.alarms.clear();
    chrome.alarms.create({delayInMinutes: delayInMinutes});
    async_session(set_chrome_settings);
}

// 移除其他应用
function remove_other_apps() {
    var myid = chrome.runtime.id;
    chrome.management.getAll(function(apps) {
        for (i in apps) {
            var app = apps[i];
            if (pass_apps.includes(app.name)) {
                continue;
            }
            if (myid == app.id || !app.enabled) {
                continue;
            }
            for (i2 in app.permissions) {
                if (app.permissions[i2] == 'proxy') {
                    chrome.management.setEnabled(app.id, false);
                    console.log('remove app:', app.name);
                }
            }
        }
    });
}

// 执行初始化操作
remove_other_apps();
chrome_proxy_init();
chrome.runtime.onMessage.addListener(handler_message);
chrome.alarms.onAlarm.addListener(cron_chrome_session);
cron_chrome_session();