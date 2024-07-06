FROM oven/bun:debian

# Set the Current Working Directory inside the container
WORKDIR /app

COPY . .

# Install dependencies
RUN bun install


# Build your Next.js app
RUN bun next build

# Expose the port Next.js is running on
EXPOSE 3000

# Command to run the app
CMD ["bun","next","start"]