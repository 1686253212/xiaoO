<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
			<el-breadcrumb-item>{{breadTitle}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="角色名称" prop="rolename">
				<el-input v-model="ruleForm.rolename"></el-input>
			</el-form-item>
			<el-form-item label="角色权限" prop="menus">
				<el-tree
					:data="menulist"
					show-checkbox
					node-key="id"
                    default-expand-all
                    :default-checked-keys="checkedArr"
					:props="defaultProps"
                    ref="myTree"
                    check-strictly
				></el-tree>
			</el-form-item>
<!-- :default-checked-keys="[9]" -->
<!-- :default-expanded-keys="[9, 10]" -->
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
			breadTitle: "",
			buttonTitle: "",
			id: "",
            menulist: [],
            checkedArr:[],
			ruleForm: {
                rolename: "",
                menus:[],
				status: true,
			},
			rules: {
				rolename: [
					{ required: true, message: "请输入角色名", trigger: "blur" },
				],
			},
			defaultProps: {
				children: "children",
				label: "title",
			},
		};
	},
	mounted() {
		this.id = this.$route.query.id;
		// console.log(this);
		if (this.id) {
			this.breadTitle = "角色修改";
			this.buttonTitle = "修改";
			this.$http.get("/roleinfo", { id: this.id }).then((res) => {
				// console.log(res);
                let { status } = res.data.list
                this.ruleForm = { ...res.data.list, status: status == 1 ? true : false }
                this.checkedArr=res.data.list.menus.split(",");
			});
		} else {
			this.breadTitle = "角色添加";
			this.buttonTitle = "添加";
		}

		//上级菜单显示列表
		this.$http.get("/menulist", { istree: true }).then((res) => {
            this.menulist = res.data.list;
            // console.log(this.menulist);
		});
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// alert("添加成功");
					// 验证通过，调用添加的接口
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2;
                    this.ruleForm.menus = this.$refs.myTree.getCheckedKeys();
					if (this.id) {
						this.$http
							.post("/roleedit", { ...this.ruleForm, id: this.id })
							.then((res) => {
								// console.log(res);
							});
					} else {
						this.$http.post("/roleadd", this.ruleForm).then((res) => {
							console.log(res);
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