---
title: How to Deploy with Docker Manually 
date: '2021-02-11T07:47:39.356Z'
description: ''
---

So you need to deploy your prototype. You were about to head over to Heroku like always, but you wanted to try something different this time. So, not to be left behind, you Dockerized it. You build the image locally, and it works like a charm. Now you need to get it from here to there. How to proceed...?

One option, probably the simplest, is to go through DockerHub. With this
approach, your Docker images are treated exactly like a git repo. You make an
account and a repository on DH, push your image to your repository, then log
into your remote server and pull it back down.

For some folks this may present an issue as you only get a single private
repository with Docker's free plan. If it's important to you that your image not
show up in search results, you can upgrade to Pro or you can do away with Dockerhub altogether.
If you're trying to save money and you have a relatively small app, just moving your image around manually is probably the quickest way for you.

This approach involves compressing your image to a tarball archive, then copying it to your remote server using `scp`.

To do this, we need to:

1. Note the name or IMAGE ID of the Docker image you want to transfer
2. Save it locally - `docker save -o <path to tarball> <image name or IMAGE ID>`

In the step above, the name should be used with caution since you could have
multiple images with the same name (you need to specify the image tag to disambiguate). To be safe, I always use the IMAGE ID, since that's guaranteed to be unique. 

3. Transfer your image to your remote server over SSH using the `scp` utility.

The basic syntax for that operation is as follows:

```bash
scp local/path/to/tarball remote_username@123.456.12.123:/path/to/remote/directory
```
The last part of the command specifies the remote user, the host, and everything after the
colon is the path of the location where you will be transferring your file.

Typically you'll be transferring files to somewhere in your home directory so
supposing you have an EC2 instance or some such, your command might look like
this:

```bash
scp ~/image.tar ec2-user@ec2-12-34-123-456.compute-1.amazonaws.com:~
```
4. Turn your tarball back into a Docker image.

`scp` will just transfer the file and then immediately log you out of your
remote machine, so for this step you'll have to ssh back in again.

Once you've done that (and made sure that you have Docker installed on your
remote machine):

```bash
sudo docker load < image.tar
``` 
Once you pipe the contents of your tarball to the load command, you can run
`sudo docker images` and you should see your image!

5. The last step is just to run your container.

Assuming everything went well, your application should be deployed and you should
be able to interact with it.

If your application involves persisting data, then you should probably think about running a separate container with a database image, or going with a cloud database provider. Similarly, if you require elastic scaling, then this definitely isn't the approach for you. But in that case you're probably not dealing with a prototype anymore.

With this approach, your Dockerfile does all of the heavy lifting, which means you're forced to think about how your app really works. You don't have access to Heroku's [buildpacks](https://devcenter.heroku.com/articles/buildpacks) to magically build your app, you have to write the buildpack yourself. If you're prepared to do that, then with the steps above, actually deploying your app should be a snap.

Another caveat here is that anybody you want to look at your app has to paste the raw IP address in their search bar. At least Heroku gives you a human-readable name that's usually more memorable than a bunch of numbers.

Maybe now is the perfect time then to learn how to manage your own DNS...
