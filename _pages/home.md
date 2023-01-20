---
title: Home
layout: collection
permalink: /home/
---


{% for post in site.posts limit:3 %}
   {{ post.title }} 
{% endfor %}
