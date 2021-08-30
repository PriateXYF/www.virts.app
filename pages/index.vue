<template>
  <div>
    <div id="wrapper" class="fade-in">
      <div id="intro">
        <h1>{{config.title}}</h1>
        <p v-html="config.content"></p>
        <ul class="actions">
          <li><a href="#header" class="button icon solid solo fa-arrow-down scrolly">Continue</a></li>
        </ul>
      </div>
      <header id="header">
        <a class="logo">{{ config.title }}</a>
      </header>

      <!-- Nav -->
      <nav id="nav">
        <ul class="links">
          <li class="active"><nuxt-link to="">Project</nuxt-link></li>
          <li><nuxt-link to="doc">Documentation</nuxt-link></li>
          <li><nuxt-link to="about">About</nuxt-link></li>
        </ul>
        <ul class="icons">
          <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
          <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
          <li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
          <li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
        </ul>
      </nav>

      <!-- Main -->
      <div id="main">
        <!-- <script id="article" type="text/html"> -->
        <!-- {artical_list} -->
        <article class="post featured" id='post_{$index}' v-for="(category, index) in project['artical_list']"
          :key="index">
          <header class="major">
            <span class="date">{{category.header}}</span>
            <h2><a :href="category.href">{{category.title}}</a></h2>
            <p>{{category.content}}</p>
          </header>
          <section class="tiles">
            <!-- <% for(var i = 0; i < item.item_list.length; i++){ %> -->
            <article class="style1" v-for="(item, index2) in category.item_list" :key="index2">
              <span class="image">
                <img :src="item.image" alt="" />
              </span>
              <a :href="item.href">
                <h2 v-html="item.title"></h2>
                <div class="content">
                  <p>{{item.content}}</p>
                </div>
              </a>
            </article>
          </section>
          <ul class="actions special">
            <li v-show="category.add_btn == '' ? false : true"><a :number='category.number' :obj='category.id'
                class="button large add_btn">
                {{category.add_btn}} </a></li>
          </ul>
        </article>
        <!-- {each} -->
        <!-- </script> -->
      </div>

      <!-- Footer -->
      <footer id="footer">
        <section>
          <form method="post" action="#">
            <div class="fields">
              <div class="field">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" />
              </div>
              <div class="field">
                <label for="message">Message</label>
                <textarea name="message" id="message" rows="3"></textarea>
              </div>
            </div>
            <ul class="actions">
              <li><input type="submit" value="Send Message" /></li>
            </ul>
          </form>
        </section>
      </footer>

      <!-- Copyright -->
      <div id="copyright">
        <ul>
          <li>&copy; virts.app</li>
          <li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import * as dayjs from 'dayjs'
  export default {
    // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    // },
    data() {
      return {
        config: {
          title: "",
          content: "",
        },
        project: []
      }
    },
    methods: {
      async loadConfig() {
        console.log(this.$local.data.config)
        const AV = this.$AV
        const now = dayjs().format()
        // delete this.$local.data.config
        if ("config" in this.$local.data && this.$local.data.config) {
          console.log("网站基本数据缓存命中.")
          this.config = this.$local.data.config
          dayjs().diff(this.$local.data.config.time, 'day') > 1 && delete this.$local.data.config
        } else {
          try {
            const query = new AV.Query('Config')
            console.log("正在拉取网站基本数据.")
            const configs = await query.find()
            const config = {}
            configs.forEach((conf) => {
              const val = conf.get('key') == 'content' ? conf.get('value').replace(/\n/g, '<br>') : conf.get(
                'value')
              config[conf.get('key')] = val
            })
            config['time'] = now
            this.$local.data.config = config
            this.config = this.$local.data.config
          } catch (error) {
            console.error(error)
          }
        }
      },
      async loadProject(objId, number) {
        console.log(this.$local.data.project)
        const AV = this.$AV
        const now = dayjs().format()
        // delete this.$local.data.config
        if ("project" in this.$local.data && this.$local.data.project) {
          console.log("网站项目数据缓存命中.")
          this.project = this.$local.data.project
          dayjs().diff(this.$local.data.project.time, 'day') > 1 && delete this.$local.data.project
        } else {
          var project = {
            artical_list: []
          }
          try {
            // 载入时获取父级标签
            const query = new AV.Query('Tab')
            query.equalTo('parent', '0')
            // 按优先级降序
            query.descending('priority')
            console.log("正在拉取网站项目数据.")
            const father_tabs = await query.find()
            for (const index in father_tabs) {
              const father_tab = father_tabs[index]
              const limit_num = objId == father_tab.id ? number : father_tab.get('number')
              const father = {
                title: father_tab.get('title'),
                header: father_tab.get('header'),
                content: father_tab.get('content'),
                href: father_tab.get('href'),
                number: limit_num,
                add_btn: father_tab.get('button'),
                id: father_tab.id,
                item_list: []
              }
              const query_sub = new AV.Query('Tab')
              query_sub.equalTo('parent', father_tab.id)
              // 按 createdAt 升序排列
              query_sub.descending('createdAt')
              query_sub.limit(limit_num)
              const sub_tabs = await query_sub.find()
              sub_tabs.forEach((sub_tab) => {
                const sub = {
                  title: sub_tab.get('title'),
                  image: sub_tab.get('image'),
                  content: sub_tab.get('content'),
                  href: sub_tab.get('href'),
                }
                father.item_list.push(sub)
              })
              project.artical_list.push(father)
            }
            project.artical_list.forEach((item) => {
              item.item_list = item.item_list.map((item) => {
                item.image = item.image || ('/images/square/pic' + Math.floor(Math.random() * 14 +
                    1) +
                  '.jpg')
                return item
              })
            })
            project['time'] = now
            this.$local.data.project = project
            this.project = this.$local.data.project
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    beforeMount() {
      this.loadConfig()
      this.loadProject()
    },
  }

</script>
