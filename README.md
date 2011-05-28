Frontent for Service Activity Monitoring of Talend ESB
=============

Simple One-page application based on Ext JS 4.0.1 for displaying information from Talend ESB Service Activity Monitoring

How to deploy it
==============
* Start your Tomcat and Database.
* Deploy *sam-server-war.war* file into it, make sure it's properly configured with DB access.
* Make sure this link works ok for you: http://localhost:8080/sam-server-war/api/v1.0/list?start=10&limit=30
* Go to <code>${TOMCAT_HOME}/webapps/ROOT</code> and do <code>git clone git://github.com/zubairov/tesb-samui.git samui</code>
* Navigate to http://localhost:8080/samui

Screenshot
==============
![Screenshot](http://content.screencast.com/users/rzubairov/folders/Jing/media/8e12c33f-7d89-4b1e-9962-a958058b49a1/00001329.png)
