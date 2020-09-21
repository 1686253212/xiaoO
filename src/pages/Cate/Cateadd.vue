<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/cate' }">商品分类列表</el-breadcrumb-item>
			<el-breadcrumb-item>{{breadTitle}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="上级分类" prop="pid">
				<el-select v-model="ruleForm.pid" placeholder="请选择">
					<el-option label="顶级分类" :value="0"></el-option>
					<el-option v-for="item in catelist" :label="item.catename" :value="item.id" :key="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="分类名称" prop="catename">
				<el-input v-model="ruleForm.catename"></el-input>
			</el-form-item>
			<el-form-item label="图片">
				<el-upload
					action
					list-type="picture-card"
					:auto-upload="false"
					:on-change="change"
					:file-list="imgArr"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-switch v-model="ruleForm.status"></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			breadTitle: "1",
			buttonTitle: "",
			id: "",
			imgArr: [],
			catelist: [],
			ruleForm: {
				pid: "",
				catename: "",
				img: "",
				status: true,
			},
			rules: {
				catename: [
					{ required: true, message: "请输入分类名称", trigger: "blur" },
				],
				pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
			},
		};
	},
	mounted() {
		this.id = this.$route.query.id;
		// console.log(this);
		if (this.id) {
			this.breadTitle = "商品分类修改";
			this.buttonTitle = "修改";
			this.$http.get("/cateinfo", { id: this.id }).then((res) => {
				let { status } = res.data.list;
				this.ruleForm = {
					...res.data.list,
					status: status == 1 ? true : false,
				};
				this.imgArr.push({ url: "http://localhost:3000" + res.data.list.img });
			});
		} else {
			this.breadTitle = "商品分类添加";
			this.buttonTitle = "添加";
		}

		//上级菜单显示列表
		this.$http.get("/catelist", { pid: 0 }).then((res) => {
			this.catelist = { ...res.data.list };
		});
	},
	methods: {
		change(file, filelist) {
			console.log(file);
			console.log(filelist);
			this.ruleForm.img = file.raw;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// alert("添加成功");
					// 验证通过，调用添加的接口
					this.ruleForm.status = this.ruleForm.status ? 1 : 2;
					// 生成一个formData对象
					let form = new FormData();
					// 往这个formData对象内，添加键值对
					for (var key in this.ruleForm) {
						form.append(key, this.ruleForm[key]);
					}
					if (this.id) {
						form.append("id", this.id);
						this.$http.post("/cateedit", form).then((res) => {
							// console.log(res);
							if (res.data.code == 200) {
								this.$router.back();
							}
						});
					} else {
						this.$http.post("/cateadd", form).then((res) => {
							console.log(res);
							if (res.data.code == 200) {
								this.$router.back();
							}
						});
					}
				} else {
					console.log("失败");
					return false;
				}
			});
		},
	},
};
</script>

<style>
</style>