<template>
  <div v-loading="loading">
    <el-card class="box-card tag-group" :class="'tag-group-'+item.labelColor" v-for="(item,index) in tags" :key="item.id">
      <div slot="header">
        <span class="tag-color"></span>{{item.labelName}}
      </div>
      <el-radio-group v-if="item.children" v-model="item.tag" >
        <el-radio :label="o" :key="index" v-for="(o,index) in item.children" border> {{o.labelName}}</el-radio>
      </el-radio-group>
    </el-card>
    <div slot="footer" class="dialog-footer text-right">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    loading: true,
    name: "tag",
    props: ['defaultValue'],
    data () {
      return {
        tags: [],
        values: []
      }
    },
    created () {
      this.loadData();
    },
    mounted () {
      setTimeout(() => {
        this.setTagValue();
      }, 100);
    },
    methods: {
      loadData () {
        this.loading = true;
        this.$http.get('/crm/customer/label/list', {}, r => {
          this.tags = r.data;
          this.loading = false;
        })
      },
      handleCancel () {
        this.$emit('onCancel');
      },
      handleOk () {
        this.values = [];
        this.tags.forEach(item => {
          if (item.tag) {
            this.values.push(item.tag);
          }
        });
        this.$emit('onOk', this.$util.extend(this.values));
      },
      setTagValue () {
        const _tags = [];
        for (let j = 0, len2 = this.tags.length; j < len2; j++) {
          const tag = this.tags[j];
          tag.tag = null;
          const newGroup = this.$util.extend(tag);
          for (let i = 0, len = this.defaultValue.length; i < len; i++) {
            const item = this.defaultValue[i];
            if (newGroup.id === item.parentId) {
              const children = newGroup.children;
              if (children) {
                children.forEach(c => {
                  if (c.id === item.id) {
                    newGroup.tag = c;
                  }
                });
              }
            }
          }
          _tags.push(newGroup);
        }
        this.tags = _tags;

      }
    },
    watch: {
      defaultValue () {
        this.setTagValue();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/tag";
</style>
