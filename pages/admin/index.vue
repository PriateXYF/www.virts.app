<template>
    <div>
        <div id="wrapper">

		<!-- Header -->
		<header id="header">
			<a href="/" class="logo">Index</a>
		</header>

		<!-- Nav -->
		<nav id="nav">
			<ul class="links">
				<li class="active"><a href="index.html">Config</a></li>
				<li><a href="tabs.html">Tabs</a></li>
				<li><a href="article.html">Article</a></li>
				<li><a href="message.html">Message</a></li>
				<li><a href="log.html">Log</a></li>
			</ul>
		</nav>

		<!-- Main -->
		<div id="main">

			<!-- Post -->
			<section class="post">
				<header class="major">
					<h1>配置管理</h1>
				</header>
				<h2>基础配置</h2>

				<form method="post" action="#" id="form">
						<div class="row gtr-uniform">
							<div class="col-12 col-12-xsmall">
								<input type="text" obj="{title_id}" name="title" id="title" value="{title}" placeholder="网站标题" />
							</div>
							<!-- Break -->
							<div class="col-12">
								<textarea name="content" obj="{content_id}" id="content" placeholder="网站描述"
									rows="6">{content}</textarea>
							</div>
							<div class="col-12 col-12-xsmall">
								<input type="email" obj="{email_id}" name="email" id="email" value="{email}" placeholder="Email" />
							</div>
							<div class="col-6 col-12-small">
								<input type="checkbox" obj="{start_id}" id="start" name="start" {start}>
								<label for="start">是否开启站点</label>
							</div>
							<!-- Break -->
							<div class="col-12">
								<ul class="actions">
									<li><input type="submit" value="Save" class="primary" /></li>
								</ul>
							</div>
						</div>
				</form>
				<hr />
			</section>

		</div>
		<!-- Copyright -->
		<div id="copyright">
		</div>

	</div>
    </div>
</template>