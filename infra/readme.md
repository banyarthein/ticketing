## Steps to create ingress-nginx

1. Change in skaffold file
2. Change image name in deployment file
3. run

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/130af33510882ae62c89277f2ad0baca50e0fafe/deploy/static/mandatory.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.43.0/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/provider/cloud-generic.yaml
```

#Command to run Google Cloud Image in local Kubernetes

```
gcloud container clusters get-credentials <Cluster Name>
```

For example

```
gcloud container clusters get-credentials ticketing-sit-instance
```

#Command to create secret Pod

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=ticketing
```
