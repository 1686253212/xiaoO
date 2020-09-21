<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>规格列表</el-breadcrumb-item>
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
			<el-table-column prop="id" label="规格编号" width="80"></el-table-column>
			<el-table-column prop="specsname" label="规格名称"></el-table-column>
			<el-table-column label="规格属性">
				<template slot-scope="scope">
					<el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
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
		<el-pagination
			background
			layout="prev, pager, next"
			hide-on-single-page
			:page-size="specsSize"
			:total="specsCount"
			:current-page="currentPage"
			@prev-click="prevClick"
			@next-click="nextClick"
			@current-change="currentChange"
		></el-pagination>
		<!--  -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			specsSize: 3,
			specsCount: 0,
			currentPage: 1,
		};
	},
	mounted() {
		this.getList();
		// this.getPage();
		this.$http.get("/specscount").then((res) => {
			// console.log(res);
			this.specsCount = res.data.list[0].total;
		});
	},
	methods: {
		// getPage() {

		// },
		getList() {
			this.$http
				.get("/specslist", { size: this.specsSize, page: this.currentPage })
				.then((res) => {
					this.tableData = res.data.list;
					// console.log(res);
				});
		},
		handleEdit(index, row) {
			this.$router.push("/specsedit?id=" + row.id);
		},
		confirmDel(row) {
			this.$http
				.post("/specsdelete", { ...this.tableData, id: row.id })
				.then((res) => {
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
			this.$router.push("/specsadd");
		},
		prevClick() {
			this.currentPage--;
			this.getList();
		},
		nextClick() {
			this.currentPage++;
			this.getList();
		},
		currentChange(n) {
			this.currentPage = n;
			this.getList();
		},
	},
};
</script>

<style scoped>
</style>
