<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
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
			<el-table-column prop="id" label="角色编号" width="80"></el-table-column>
			<el-table-column prop="rolename" label="角色名称"></el-table-column>
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
		};
	},
	mounted() {
		this.$http.get("/rolelist", { istree: true }).then((res) => {
			this.tableData = res.data.list;
		});
	},
	methods: {
		handleEdit(index, row) {
			this.$router.push("/roleedit?id=" + row.id);
		},
		confirmDel(row) {
			this.$http.post("/roledelete", { id: row.id }).then((res) => {
				this.tableData = res.data.list;
			});
			this.$message({
				message: "删除成功",
				type: "success",
			});
		},
		add() {
			this.$router.push("/roleadd");
		},
	},
};
</script>

<style scoped>
</style>
