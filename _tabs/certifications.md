---
layout: page
icon: fas fa-award
title: Certifications
order: 3
---

{% include lang.html %}

<div id="page-category">
  <h1 class="ps-lg-2">
    <i class="fas fa-award fa-fw text-muted"></i>
    Certifications
    <span class="lead text-muted ps-2">
      {% assign cert_posts = site.posts | where_exp: "post", "post.categories contains 'Certifications'" %}
      {{ cert_posts | size }}
    </span>
  </h1>

  {% for post in cert_posts %}
    <article class="card-wrapper card mb-4">
      <a href="{{ post.url | relative_url }}" class="post-preview row g-0 flex-md-row-reverse">
        {% if post.image %}
          <div class="col-md-4">
            <img src="{{ post.image.path | default: post.image }}" alt="{{ post.image.alt | default: post.title }}" class="img-fluid rounded-end" style="object-fit:cover;height:100%;width:100%;">
          </div>
          <div class="col-md-8">
        {% else %}
          <div class="col-12">
        {% endif %}
          <div class="card-body d-flex flex-column p-4">
            <h2 class="card-title my-2 mt-md-0">{{ post.title }}</h2>
            <div class="card-text content mt-0 mb-3">
              <p>{{ post.description | default: post.excerpt | strip_html | truncate: 200 }}</p>
            </div>
            <div class="post-meta flex-grow-1 d-flex align-items-end">
              <div class="me-auto">
                <i class="far fa-calendar fa-fw me-1"></i>
                {% include datetime.html date=post.date lang=lang %}
                {% if post.categories.size > 0 %}
                  <i class="far fa-folder-open fa-fw me-1 ms-3"></i>
                  {% for cat in post.categories %}
                    {% unless cat == 'Certifications' %}
                      <span class="badge bg-secondary">{{ cat }}</span>
                    {% endunless %}
                  {% endfor %}
                {% endif %}
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  {% endfor %}

  {% if cert_posts.size == 0 %}
    <p class="text-muted mt-4">No certifications posted yet. Stay tuned!</p>
  {% endif %}
</div>
