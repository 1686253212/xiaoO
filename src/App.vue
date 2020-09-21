<template>
	<div id="app">
		<el-container>
			<el-aside width="200px">
				<el-col :span="24">
					<el-menu
						default-active="2"
						class="el-menu-vertical-demo"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b"
					>
						<el-menu-item index="0">
							<i class="el-icon-menu"></i>
							<span slot="title">首页</span>
						</el-menu-item>
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-setting"></i>
								<span>系统设置</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">菜单管理</el-menu-item>
								<el-menu-item index="1-2">角色管理</el-menu-item>
								<el-menu-item index="1-3">管理员管理</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>商城管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="2-1">管理</el-menu-item>
								<el-menu-item index="2-2">管理</el-menu-item>
								<el-menu-item index="2-3">管理</el-menu-item>
								<el-menu-item index="2-3">管理</el-menu-item>
								<el-menu-item index="2-3">管理</el-menu-item>
								<el-menu-item index="2-3">管理</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<span>测试</span>
							</template>
						</el-submenu>
					</el-menu>
				</el-col>
			</el-aside>
			<el-container>
				<el-header>商城管理系统</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	name: "App",
	methods: {
		// handleOpen(key, keyPath) {
		// 	console.log(key, keyPath);
		// },
		// handleClose(key, keyPath) {
		// 	console.log(key, keyPath);
		// },
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
#app {
	margin: 0;
	padding: 0;
}
html,
body,
#app,
.el-container {
	width: 100%;
	height: 100%;
}
.el-header {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	/* line-height: 60px; */
}

.el-aside {
	background-color: #d3dce6;
	color: #333;
	/* line-height: 200px; */
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	/* line-height: 160px; */
}

body > .el-container {
	margin-bottom: 40px;
}
.el-breadcrumb {
	margin-bottom: 20px;
}
.el-tag--light {
	margin-right: 4px;
}
.el-pagination {
	text-align: right;
}
</style>
