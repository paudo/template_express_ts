# template_express_ts

## Generate self-signed SSL certificate
```
######################
# Become a Certificate Authority
######################

# Generate private key
openssl genrsa -des3 -out myCA.key 2048
# Generate root certificate
openssl req -x509 -new -nodes -key myCA.key -sha256 -days 825 -out myCA.pem

######################
# Create CA-signed certs
######################

NAME=mydomain.com # Use your own domain name
# Generate a private key
openssl genrsa -out $NAME.key 2048
# Create a certificate-signing request
openssl req -new -key $NAME.key -out $NAME.csr
# Create a config file for the extensions
>$NAME.ext cat <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $NAME # Be sure to include the domain name here because Common Name is not so commonly honoured by itself
DNS.2 = bar.$NAME # Optionally, add additional domains (I've added a subdomain here)
IP.1 = 192.168.0.13 # Optionally, add an IP address (if the connection which you have planned requires it)
EOF
# Create the signed certificate
openssl x509 -req -in $NAME.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial \
-out $NAME.crt -days 825 -sha256 -extfile $NAME.ext
```

# Derived from template_node_ts
Template for node projects including configuration for Typescript and eslint 
as well as mocha and chai for testing.

## First steps
Go to the package.json and change the parameters, `name`, `repository->url`,
`bugs->url` and `homepage` according to your new project name and your new
repository.  
After that delete the tsconfig and run `npm install` this will correct the name in the
package-lock.json and install all packages necessary. Do not forget to add the 
package-lock.json back to git!

## Build and Run
`npm run build` compiles the app to js.  
`npm run start` executes the compiled code.  
`npm run serve` runs the app with ts-node.  

## Test
Test should be placed in `./spec` and every test file needs to end with `.spec.ts`.  
`npm run test` will run the tests.  
`npm run lint` runs eslint.
