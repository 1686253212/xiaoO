<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/user' }">管理员列表</el-breadcrumb-item>
			<el-breadcrumb-item>{{breadTitle}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="所属角色" prop="roleid">
				<el-select v-model="ruleForm.roleid" placeholder="请选择">
					<el-option v-for="item in rolelist" :label="item.rolename" :value="item.id" :key="item.id"></el-option>
				</el-select>
			</el-form-item>
            <el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
            <el-form-item label="密码" prop="password">
				<el-input v-model="ruleForm.password"></el-input>
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
			uid: "",
			rolelist: [],
			ruleForm: {
                roleid:"",
                username:"",
                password:"",
				status: true,
			},
			rules: {
				username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
				roleid: [{ required: true, message: "请选择角色", trigger: "blur" }],
			},
		};
	},
	mounted() {
		this.uid = this.$route.query.uid;
		// console.log(this);
		if (this.uid) {
			this.breadTitle = "用户修改";
			this.buttonTitle = "修改";
			this.$http.get("/userinfo", { uid: this.uid }).then((res) => {
				let {status} =res.data.list;
				this.ruleForm = {...res.data.list,status:status==1 ? true : false,password:""}
			});
		} else {
            this.breadTitle = "用户添加";
            this.buttonTitle = "添加";
		}

		//上级菜单显示列表
		this.$http.get("/rolelist").then(res => {
            this.rolelist = res.data.list;
            // console.log(this.rolelist);
		});
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// alert("添加成功");
					// 验证通过，调用添加的接口
					this.ruleForm.status = this.ruleForm.status ? 1 : 2;
					if (this.uid) {
						this.$http.post("/useredit", {...this.ruleForm,uid:this.uid}).then(res => {
							// console.log(res)
						});
					} else {
						this.$http.post("/useradd", this.ruleForm).then(res => {
							// console.log(res)
						});
					}
					this.$router.back();
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