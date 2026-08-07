---
layout: page
icon: fas fa-award
title: Certifications
order: 3
---

{% include lang.html %}

{% assign cert_posts = site.posts | where_exp: "post", "post.categories contains 'Certifications'" %}

<div id="page-category">

  {% if cert_posts.size > 0 %}
    <ul class="content ps-0">
      {% for post in cert_posts %}
        <li class="d-flex justify-content-between px-md-3">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span class="dash flex-grow-1"></span>
          {% include datetime.html date=post.date class='text-muted small text-nowrap' lang=lang %}
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p class="text-muted mt-4">No certifications posted yet. Stay tuned!</p>
  {% endif %}

</div>
