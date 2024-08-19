# Running the News Aggregator App
This guide will help you set up and run the "News Aggregator" app using Docker on any machine.

## Prerequisites
Ensure Docker is installed on your machine. You can download it from [Docker's official website](https://hub.docker.com/).

Make sure you have access to the following environment variables, which are required to run the application:
- `` VITE_NEWSAPI_API_KEY: <Your_Key> ``
- `` VITE_GUARDIAN_API_KEY: <Your_Key> ``
- `` VITE_NEWYORKTIMES_API_KEY: <Your_Key> ``

## Steps to Run the Application

### 1) Pull the Docker Image

First, pull the Docker image from Docker Hub using the following command:

``` 
docker pull praveenkjune9/news-aggregator 
```

### 2) Run the Docker Container

Run the container with the necessary environment variables and map the application to port 3009 on your host machine. 
Use the following command:

```
docker run -d -p 3009:3009 \
  -e VITE_NEWSAPI_API_KEY=<Your_Key> \
  -e VITE_GUARDIAN_API_KEY=<Your_Key> \
  -e VITE_NEWYORKTIMES_API_KEY=<Your_Key> \
  --name news-aggregator-app \
  praveenkjune9/news-aggregator 
```

> The -d flag runs the container in detached mode (in the background).

> The -p 3009:3009 flag maps port 3009 on the host machine to port 3009 on the container.

> The -e flags set the environment variables needed for the application to run.

> The --name flag gives the container a recognizable name (news-aggregator-app).

### 3) Access the Application

Once the container is up and running, open your web browser and navigate to:

```
http://localhost:3009 
```

- The News Aggregator application should be up and running.

### 4) Stopping the Application

To stop the running container, use the following command:

```
docker stop news-aggregator-app
```

### 5) Restarting the Application

If you want to restart the container, you can use:

```
docker start news-aggregator-app
```

### 6) Removing the Container

If you want to remove the container after stopping it, use:

```
docker rm news-aggregator-app
```



This guide should help you successfully run your News Aggregator app on any machine using Docker.