# Kubernetes commands 

# Restart deployment
kubectl rollout restart deployment/portfolio

## Config
kubectl create configmap portfolio --from-literal=GMAIL_USER=...  --from-literal=RECIPIENT_EMAIL=...

## Secret
kubectl create secret generic portfolio --from-literal=GMAIL_APP_PASSWORD="aaaa aaaa aaaa aaaa"