---
title: Home
permalink: /home/
---


{% for post in site.posts limit:5 %}
   {{ post.title }} 
   {{ post.excerpt}}
   {% include archive-single.html type="grid" %}
{% endfor %}
