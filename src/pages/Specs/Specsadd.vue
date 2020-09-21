<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
			<el-breadcrumb-item>{{breadTitle}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="规格名称" prop="specsname">
				<el-input v-model="ruleForm.specsname"></el-input>
			</el-form-item>
			<el-form-item v-for="(domain, index) in ruleForm.attrs" :label="'规格属性' + index" :key="index">
				<el-input v-model="domain.value"></el-input>
				<el-button @click="addDomain" v-if="index==0">新增规格属性</el-button>
				<el-button @click.prevent="removeDomain(domain)" v-if="index!=0">删除</el-button>
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
			specslist: [],
			ruleForm: {
				specsname: "",
				attrs: [
					{
						value: "",
					},
				],
				status: true,
			},
			rules: {
				specsname: [
					{ required: true, message: "请输入规格名称", trigger: "blur" },
				],
			},
		};
	},
	mounted() {
		this.id = this.$route.query.id;
		// console.log(this);
		if (this.id) {
			this.breadTitle = "规格修改";
			this.buttonTitle = "修改";
			this.$http.get("/specsinfo", { id: this.id }).then((res) => {
				let { status } = res.data.list[0];
				// console.log(res);
				this.ruleForm = {
					...res.data.list[0],
					status: status == 1 ? true : false,
				};
				// console.log(this.ruleForm.attrs);
				this.ruleForm.attrs = this.ruleForm.attrs.map((item) => {
					return {
						value: item,
					};
				});
			});
		} else {
			this.breadTitle = "规格添加";
			this.buttonTitle = "添加";
		}

		//上级菜单显示列表
		this.$http.get("/specslist", { pid: 0 }).then((res) => {
			this.specslist = { ...res.data.list };
		});
	},
	methods: {
		change(file, filelist) {
			console.log(file);
			console.log(filelist);
			this.ruleForm.img = file.raw;
		},
		removeDomain(item) {
			var index = this.ruleForm.attrs.indexOf(item);
			if (index !== -1) {
				this.ruleForm.attrs.splice(index, 1);
			}
		},
		addDomain() {
			this.ruleForm.attrs.push({
				value: "",
			});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// alert("添加成功");
					// 验证通过，调用添加的接口
					this.ruleForm.status = this.ruleForm.status ? 1 : 2;
					this.ruleForm.attrs = this.ruleForm.attrs
						.map((item) => {
							return item.value;
						})
						.join(",");
					if (this.id) {
						this.$http
							.post("/specsedit", { ...this.ruleForm, id: this.id })
							.then((res) => {
								// console.log(res);
								if (res.data.code == 200) {
									this.$router.back();
								}
							});
					} else {
						// this.ruleForm.attrs = this.ruleForm.attrs
						// 	.map((item) => {
						// 		return item.value;
						// 	})
						// 	.join(",");
						this.$http.post("/specsadd", this.ruleForm).then((res) => {
							console.log(res);
							if (res.data.code == 200) {
								this.$router.back();
							}
						});
					}
					// this.$router.back();
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