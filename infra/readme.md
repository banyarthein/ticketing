#Command to create secret Pod
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=ticketing
```