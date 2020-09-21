<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>管理员列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button type="primary" @click="add">添加</el-button>
		<el-table
			:data="tableData"
			style="width: 100%;margin-bottom: 20px;"
			row-key="id"
			border
			default-expand-all
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
		>
			<el-table-column prop="id" label="用户编号" width="80"></el-table-column>
			<el-table-column prop="username" label="用户名"></el-table-column>
			<el-table-column label="所属角色">
				<template slot-scope="scope">
					<el-tag>{{scope.row.roleid | rolenameFormat(roleList)}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<el-tag>{{scope.row.status | statusFormat}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-popconfirm title="确定删除吗？" @onConfirm="confirmDel(scope.row)">
						<el-button slot="reference" size="mini" type="danger">删除</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			roleList: [],
		};
	},
	filters: {
		rolenameFormat(roleid, roleList) {
			if (roleList.length > 0) {
				let item = roleList.find((item) => {
					return item.id == roleid;
				});
				return item.rolename;
			}
		},
	},
	mounted() {
		this.getList();
		this.$http.get("/rolelist").then((res) => {
			this.roleList = res.data.list;
		});
	},
	methods: {
		getList() {
			this.$http.get("/userlist", { size: 4, page: 1 }).then((res) => {
				this.tableData = res.data.list;
				// console.log(res);
			});
		},
		handleEdit(index, row) {
			this.$router.push("/useredit?uid=" + row.uid);
		},
		confirmDel(row) {
			this.$http.post("/userdelete", { uid: row.uid }).then((res) => {
				if (res.data.code == 200) {
					this.getList();
					this.$message({
						message: "删除成功",
						type: "success",
					});
				}
			});
		},
		add() {
			this.$router.push("/useradd");
		},
	},
};
</script>

<style scoped>
</style>
