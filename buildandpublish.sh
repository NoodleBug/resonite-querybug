sudo docker build -t harbor.noodlebug.network/resonite-querybug/querybug:latest .
sudo docker save harbor.noodlebug.network/resonite-querybug/querybug:latest >file.tar
sudo regctl image import harbor.noodlebug.network/resonite-querybug/querybug:latest file.tar -v info
rm file.tar
kubectl rollout restart deployment resonite-querybug -n resonite-querybug
