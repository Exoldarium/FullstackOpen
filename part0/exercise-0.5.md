```mermaid
sequenceDiagram;
	participant browser;
	participant server;
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa;
  activate server;
  server-->>browser: HTML Document;
  deactivate server;

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css;
  activate server;
  server-->>browser: css file;
  deactivate server;

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js;
  activate server;
  server-->>browser: spa JavaScript file;
  deactivate server;


	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json;
  activate server;
  server-->>browser: spa.js JavaScript file;
  deactivate server [{ "content": 'new note', "date": '2023-06-05T14:09:03.716Z'}];
```
