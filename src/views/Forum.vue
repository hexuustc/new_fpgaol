<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
        </base-header>

        <div class="container-fluid mt--7 px-0">
            <div class="row justify-content-center">
                <div class="col-xl-12 mb-5 mb-xl-0" >
                    <div class="forum-page">
                        <card header-classes="bg-transparent">
                            <template v-slot:header>
                              <div class="row align-items-center">
                                <div class="col">
                                  <h6 class="text-muted ls-1 mb-1">Forum</h6>
                                  <h3 class="nav-link-text text-center ls-1 mb-1 h3">
                                    论坛交流
                                  </h3>
                                </div>
                                <div class="col-12">
                                    <el-button
                                        :class="{ active: activePage === 'forum' }"
                                        @click="activePage = 'forum'">交流</el-button>
                                    <el-button
                                        :class="{ active: activePage === 'feedback' }"
                                        @click="activePage = 'feedback'">反馈</el-button>
                                    <el-button
                                        :class="{ active: activePage === 'nickname' }"
                                        @click="activePage = 'nickname'">昵称</el-button>
                                </div>
                              </div>
                            </template>

                             <!-- 反馈建议区域 -->
                            <div class="feedback-section" v-if="activePage === 'feedback'">
                                <!-- 反馈提交区域 -->
                                <el-card class="mb-4">
                                    <template v-slot:header>
                                        <span>反馈建议</span>
                                    </template>
                                    <el-input
                                        type="textarea"
                                        v-model="feedbackContent"
                                        placeholder="反馈建议"
                                        :maxlength="3000"
                                        :rows="5"
                                        class="mb-2">
                                    </el-input>
                                    <el-button type="primary" @click="submitFeedback">提交</el-button>
                                </el-card>
                            
                                <!-- 用户反馈列表 -->
                                <el-card v-for="feedback in userFeedbacks" :key="feedback.timestamp" class="mb-2">
                                    <div class="text item">
                                        <p style="white-space: pre-wrap;">{{ feedback.content }}</p>
                                        <span>— 提交时间: {{ new Date(feedback.timestamp).toLocaleString() }}</span>
                                        <el-button size="mini" type="danger" @click="deleteFeedback(feedback.timestamp)">
                                          删除
                                        </el-button>
                                    </div>
                                </el-card>
                            </div>
                            <div class="forum-page" v-if="activePage === 'forum'">
                                <el-card class="mb-4">
                                    <template v-slot:header>
                                        <div class="clearfix">
                                            <span>论坛交流</span>
                                        </div>
                                    </template>
                                    <el-input
                                        type="textarea"
                                        :rows="5"
                                        :maxlength="3000"
                                        placeholder="分享你的想法..."
                                        class="mb-2"
                                        v-model="newPost">
                                    </el-input>
                                    <el-button type="primary" @click="submitPost">发布</el-button>
                                </el-card>
                            
                                <div class="posts">
                                    <el-card
                                        class="mb-2"
                                        v-for="post in posts"
                                        :key="post.id">
                                        <template v-slot:header>
                                            <div class="clearfix">
                                                <span class="float-left">{{ post.nickname }}</span>
                                                <span class="float-right">{{ new Date(post.timestamp * 1000).toLocaleString() }}</span>
                                            </div>
                                        </template>
                                        <div class="text item">
                                            <p style="white-space: pre-wrap;">{{ post.content }}</p>
                                            <span @click="likePost(post.id)" class="like-icon">
                                                <i :class="[post.is_liked ? 'fas' : 'far', 'fa-heart']"></i>{{ post.likes }}
                                            </span>
                                            <el-button size="mini" @click="fetchReplies(post.id)">
                                                查看回复 {{ post.reply_count }}
                                            </el-button>
                                            <el-button size="mini" @click="toggleReplyBox(post.id)">回复</el-button>
                                            <el-button v-if="post.is_author" size="mini" type="danger" @click="deletePost(post.id)">删除</el-button>
                                            <div v-if="post.showReplyBox">
                                                <el-input
                                                    v-model="replies[post.id]"
                                                    type="textarea"
                                                    :maxlength="3000"
                                                    :rows="5"
                                                    placeholder="写下你的回复..."
                                                    class="mb-2 mt-1">
                                                </el-input>
                                                <el-button type="primary" size="mini" @click="submitReply(post.id)">回复</el-button>
                                            </div>                                            
                                        </div>
                                        <div v-if="post.showReplies">
                                            <div v-for="reply in post.replies"  :key="reply.timestamp" class="reply">
                                                <el-card shadow="never">
                                                    <div class="card-header">
                                                      <span class="nickname">{{ reply.nickname }}</span>
                                                      <span class="timestamp">{{ new Date(reply.timestamp * 1000).toLocaleString() }}</span>
                                                    </div>
                                                    <div class="card-content">
                                                      <p style="white-space: pre-wrap;">{{ reply.content }}</p>
                                                      <!-- 删除回复按钮... -->
                                                    </div>
                                                    <!-- 删除回复按钮 -->
                                                    <el-button v-if="reply.is_author" size="mini" type="danger" @click="deleteReply(post.id, reply.timestamp)">
                                                      删除
                                                    </el-button>
                                                </el-card>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                            <div v-if="activePage === 'nickname'" class="nickname-section">
                                <!-- 昵称修改内容 -->
                                <el-card class="mb-4">
                                    <template v-slot:header>
                                        <div class="clearfix">
                                            <span>修改昵称(每天只能修改一次)</span>
                                        </div>
                                    </template>
                                    <div class="mb-1">当前昵称：{{ nickname }}</div>
                                    <el-input v-model="newNickname" placeholder="昵称" :maxlength="100" class="mb-2"></el-input>
                                    <el-button type="primary" @click="onNicknameChange">提交昵称</el-button>
                                </el-card>
                            </div>
                        </card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nickname: '',
      newNickname: '', // 用户输入的新昵称
      lastNicknameChange: null,  // 上次更改昵称的时间
      newPost: '',
      posts: [],
      token: "",
      replies: {},  // 存储回复内容的对象
      feedbackContent: '',
      userFeedbacks: [],
      activePage: 'forum',  // 默认显示论坛交流页面
    };
  },
  created() {
    this.token = localStorage.getItem('Authorization');
    this.fetchPosts();
    this.loadNickname();
    this.fetchUserFeedbacks();
  },
  methods: {
    fetchPosts() {
            var form = new FormData();
            form.append('token', this.token);
            axios.post('http://202.38.79.96:9002/get_posts', form)
                .then(response => {
                    this.posts = response.data.posts.map(post => ({
                      ...post,
                      showReplyBox: false,
                      repliesLoaded: false, // 新增，标记回复是否已加载
                      showReplies: false, // 新增，控制是否显示回复
                    }));
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
    },
    toggleReplyBox(postId) {
            const postIndex = this.posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                this.posts[postIndex].showReplyBox = !this.posts[postIndex].showReplyBox;
            }
        },
    fetchReplies(postId) {
        // var form = new FormData();
        // form.append('token', this.token);
        // form.append('post_id', postId);
        // axios.post('http://202.38.79.96:9002/get_replies', form)
        //     .then(response => {
        //         const postIndex = this.posts.findIndex(post => post.id === postId);
        //         if (postIndex !== -1) {
        //             this.posts[postIndex].replies = response.data.replies;
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error fetching replies:', error);
        //     });
            // 找到帖子
      const postIndex = this.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        const post = this.posts[postIndex];

        // 只有在回复数量大于0且未加载回复时才请求回复
        if (post.reply_count > 0 && !post.repliesLoaded) {
          var form = new FormData();
          form.append('token', this.token);
          form.append('post_id', postId);
          axios.post('http://202.38.79.96:9002/get_replies', form)
            .then(response => {
              this.posts[postIndex].replies = response.data.replies;
              this.posts[postIndex].repliesLoaded = true; // 标记回复已加载
            })
            .catch(error => {
              console.error('Error fetching replies:', error);
            });
        }

        // 切换回复显示状态
        this.posts[postIndex].showReplies = !this.posts[postIndex].showReplies;
      }
        
    },
    submitPost() {
      // 发送帖子到服务器
        var form = new FormData();
        form.append('token', this.token)
        form.append('content',this.newPost)
        form.append('nickname', this.nickname)
      axios.post('http://202.38.79.96:9002/post', form)
        .then(response => {
          this.fetchPosts(); // 重新获取帖子列表
        })
        .catch(error => {
          console.error('Error posting:', error);
        });
      this.newPost = '';
    },
    deletePost(postId) {
      // 发送删除帖子请求
        var form = new FormData();
        form.append('token', this.token)
        form.append('post_id',postId)
      axios.post('http://202.38.79.96:9002/delete_post', form)
        .then(response => {
          this.fetchPosts(); // 重新获取帖子列表
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    },
    // ... 其他方法 ...
    deleteReply(postId, replyTimestamp) {
      const form = new FormData();
      form.append('token', this.token);
      form.append('post_id', postId);
      form.append('reply_timestamp', replyTimestamp);
      axios.post('http://202.38.79.96:9002/delete_reply', form)
        .then(response => {
          if (response.data.code === 1) {
            const postIndex = this.posts.findIndex(post => post.id === postId);
            this.posts[postIndex].repliesLoaded = false;
            this.posts[postIndex].reply_count -= 1;
            this.posts[postIndex].showReplies = false;
            if (this.posts[postIndex].reply_count==0) this.posts[postIndex].replies=[];
            // 成功删除后重新获取帖子的回复
            this.fetchReplies(postId);
          } else {
            console.error('Error deleting reply:', response.data.msg);
          }
        })
        .catch(error => {
          console.error('Error deleting reply:', error);
        });
    },
    likePost(postId) {
      // 发送点赞请求
        var form = new FormData();
        form.append('token', this.token)
        form.append('post_id',postId)
      axios.post('http://202.38.79.96:9002/like_post', form)
        .then(response => {
          this.fetchPosts(); // 重新获取帖子列表
        })
        .catch(error => {
          console.error('Error liking post:', error);
        });
    },
    submitReply(postId) {
        var form = new FormData();
        form.append('token', this.token);
        form.append('post_id', postId);
        form.append('content', this.replies[postId]);
        form.append('nickname', this.nickname);  // 假设你已经有了昵称字段
        axios.post('http://202.38.79.96:9002/reply', form)
            .then(response => {
                const postIndex = this.posts.findIndex(post => post.id === postId);
                this.posts[postIndex].repliesLoaded = false;
                this.posts[postIndex].reply_count += 1;
                this.posts[postIndex].showReplies = false;
                this.fetchReplies(postId);  // 重新获取此帖子的回复
                this.replies[postId] = '';  // 清空回复输入框
            })
            .catch(error => {
                console.error('Error submitting reply:', error);
            });
    },
    loadNickname() {
        let nicknameData = localStorage.getItem('nicknameData');
        if (nicknameData) {
            nicknameData = JSON.parse(nicknameData);
            this.nickname = nicknameData.nickname;
            this.lastNicknameChange = new Date(nicknameData.lastChange);
        }
        else{
            this.nickname = this.$store.state.username;
        }
    },
    saveNickname() {
        const now = new Date();
        if (!this.lastNicknameChange || (now - this.lastNicknameChange) > 86400000) {  // 86400000ms = 24小时
            localStorage.setItem('nicknameData', JSON.stringify({ nickname: this.nickname, lastChange: now }));
            this.lastNicknameChange = now;
        } else {
            alert('昵称一天只能设置一次！');
        }
    },
    // 当用户尝试更改昵称时调用
    onNicknameChange() {
            if (this.newNickname.length > 20) {
                alert('昵称长度不能超过20个字符！');
                return;
            }

            const now = new Date();
            if (!this.lastNicknameChange || (now - this.lastNicknameChange) > 86400000) {
                this.nickname = this.newNickname; // 更新昵称
                localStorage.setItem('nicknameData', JSON.stringify({ nickname: this.nickname, lastChange: now }));
                this.lastNicknameChange = now;
                alert('昵称已更新！');
            } else {
                alert('昵称一天只能设置一次！');
            }
        },
    submitFeedback() {
        var form = new FormData();
        form.append('token', this.token);
        form.append('content', this.feedbackContent);
        axios.post('http://202.38.79.96:9002/submit_feedback', form)
            .then(() => {
                this.feedbackContent = '';
                this.fetchUserFeedbacks();  // 重新获取用户的反馈
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);
            });
    },
    fetchUserFeedbacks() {
        var form = new FormData();
        form.append('token', this.token);
        axios.post('http://202.38.79.96:9002/user_feedback', form)
            .then(response => {
                this.userFeedbacks = response.data.feedbacks;
            })
            .catch(error => {
                console.error('Error fetching feedbacks:', error);
            });
    },
    deleteFeedback(timestamp) {
    const form = new FormData();
    form.append('token', this.token);
    form.append('timestamp', timestamp);

    axios.post('http://202.38.79.96:9002/delete_feedback', form)
      .then(response => {
        if (response.data.code === 1) {
          // 反馈删除成功后，从用户反馈列表中移除
          this.userFeedbacks = this.userFeedbacks.filter(fb => fb.timestamp !== timestamp);
        } else {
          console.error('Error deleting feedback:', response.data.msg);
        }
      })
      .catch(error => {
        console.error('Error deleting feedback:', error);
      });
  },
  }
};
</script>

<style scoped>
.forum-page {
    padding: 20px;
}

.post {
    margin-bottom: 15px;
}

.reply {
    margin-top: 10px;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
}
.active {
    background-color: #409EFF; /* 选中时的背景颜色 */
    color: white; /* 选中时的文字颜色 */
    /* 其他样式 */
}

.like-icon {
    cursor: pointer;
    color: #6b99f5; 
    margin-right: 10px;
}

.like-icon:hover {
    color: #1964fb; /* 鼠标悬停时的颜色 */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee; /* 可选，如果您希望有分割线 */
}

.nickname {
  font-weight: light;
}

.timestamp {
  color: #999;
  font-size: 0.8em;
}

.card-content {
  padding: 10px;
}

</style>