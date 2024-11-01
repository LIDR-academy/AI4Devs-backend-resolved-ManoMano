
# GitHub Copilot Extension - Documentation Provider

This service operates as middleware between Notion documentation and GitHub Copilot's AI assistant, enabling the following functions:

- Fetching documentation from Notion.
- Identifying the requesting GitHub user.
- Crafting a tailored system prompt.
- Communicating with the GitHub Copilot API to generate responses.
- Streaming AI-generated responses back to the client.

This configuration provides users with personalized assistance, harnessing both internal documentation and sophisticated AI capabilities.

Built on Express for efficient HTTP handling, it utilizes the Octokit library to seamlessly interact with the GitHub API and is set up for deployment on Vercel.

## Dependencies

- [@octokit/core](https://www.npmjs.com/package/@octokit/core): A lightweight GitHub API client for Node.js, used for interacting with GitHub's API to authenticate users and retrieve user information.

- [Readable](https://nodejs.org/api/stream.html#readable-streams): A built-in Node.js stream interface for reading data, used in this service for efficiently streaming AI-generated responses back to the client.

- [express](https://www.npmjs.com/package/express): A fast, unopinionated, minimalist web framework for Node.js, used for creating the server and handling HTTP requests and responses.

- [axios](https://www.npmjs.com/package/axios): A promise-based HTTP client for making requests to external APIs, used for communicating with the Notion API and GitHub Copilot API.

- [dotenv](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables from a .env file into process.env, used for managing configuration settings securely.

## Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```sh
    cd notion-documentation-provider
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```sh
PORT=3000
```

## Usage

Start the server:

```sh
npm start
```

The server will be running on the port specified in the `.env` file (default is 3000).

## Deployment

This application is configured to be deployed on Vercel. The configuration is specified in the `vercel.json` file.

## Creating a GitHub App

Follow the step-by-step provided by Github:

- [Official Documentation](https://docs.github.com/en/copilot/building-copilot-extensions/creating-a-copilot-extension/creating-a-github-app-for-your-copilot-extension)

## Using the GitHub Copilot Extension

- [Official Documentation](https://docs.github.com/en/copilot/building-copilot-extensions/creating-a-copilot-extension/configuring-your-github-app-for-your-copilot-agent)

## License

This project is licensed under the ISC License.
Feel free to customize this README further based on your specific needs.
