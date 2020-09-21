<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>菜单列表</el-breadcrumb-item>
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
			<el-table-column prop="id" label="菜单编号" width="80"></el-table-column>
			<el-table-column prop="title" label="菜单名称"></el-table-column>
			<el-table-column prop="icon" label="菜单图标"></el-table-column>
			<el-table-column prop="url" label="菜单地址"></el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<el-tag>{{scope.row.status | statusFormat}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="confirmDel(scope.row)">
						<el-button slot="reference" size="mini" type="danger">删除</el-button>
						<!-- <el-button slot="reference">删除</el-button> -->
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
		this.$http.get("/menulist", { istree: true }).then((res) => {
			this.tableData = res.data.list;
		});
	},
	methods: {
		handleEdit(index, row) {
			this.$router.push("/menuedit?id=" + row.id);
		},
		confirmDel(row) {
			this.$http.post("/menudelete", { id: row.id }).then((res) => {
				this.tableData = res.data.list;
			});
			this.$message({
				message: "删除成功",
				type: "success",
			});
		},
		add() {
			this.$router.push("/menuadd");
		},
	},
};
</script>

<style scoped>
</style>
