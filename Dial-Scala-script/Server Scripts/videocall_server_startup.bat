@echo off

::PeerJS server start up - Update host, port and ssl location as required
START cmd /K "peerjs --host=127.0.0.1 --port=9000 --key=peerjs --path=/myapp --sslkey=D:\GitHub\video-call-ui\security\cert.key --sslcert=D:\GitHub\video-call-ui\security\cert.pem"

::Backend server start up - Update Project Path as required
START cmd /K "D: & cd D:\GitHub\video-call & npm start"

::Frontend server start up - Update Project Path as required
START cmd /K "D: & cd D:\GitHub\video-call-ui & npm start"