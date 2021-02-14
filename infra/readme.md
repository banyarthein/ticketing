# Install Google Cloud SDK

get from website

Alternatively, open a PowerShell terminal and run the following PowerShell commands.

```
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")

& $env:Temp\GoogleCloudSDKInstaller.exe
```

## Login

```
gcloud auth login
```

## Init GCloud

```
gcloud init
```

- Select Create a new configuration for the first time. Otherwise, Reinitilize this configuration
- Select your account
- Select the project Id
  to know the project name go to Google Cloud Platform -> Select project from Top manu and check the ID of your poject
- Input y
- Select region
  to know the region go to Kubernetes Engine from GCP and check the location name

## Select kubernetes context in docker

### Run gcloud container

```
gcloud container clusters get-credentials <cluster name>

```

you will see the new kubernetes context in kubernetes tray's dropdown

```
gcloud container clusters get-credentials ticketing-dev
```

## Enable google cloud build

- go to GCP -> Tools -> Cloud Build
- Click Enable

## Steps to create ingress-nginx

1. Change in skaffold file
2. Change image name in deployment file
3. run

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/provider/cloud-generic.yaml

```

This is alternative command found out. Need to check when to run this one. This is found on internet and not included in Stephen's Udemy Learning video.

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.43.0/deploy/static/provider/cloud/deploy.yaml

```

- go to networking -> Load Balancing -> Load Balancer to check

4. Go to Loadbalancer in GCP and get ip address of LB
5. change the host file
6. Run

```
skaffold dev
```

if error in credential then type

```
gcloud auth application-default login
```

7. go to ticketing.dev
8. type

```
thisisunsafe
```

# Creating a Secret

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=ticketing

kubectl get secret
```

## Deleting PODs

```
Kubectl get get pods

kubectl delete pod container name
```
