<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
			<el-table-column prop="id" label="商品编号" width="80"></el-table-column>
			<el-table-column prop="catename" label="商品名称"></el-table-column>
			<el-table-column prop="catename" label="商品价格"></el-table-column>
			<el-table-column prop="catename" label="市场价格"></el-table-column>
			<el-table-column label="图片">
				<template slot-scope="scope">
					<!-- <el-image style="width: 100px; height: 100px" :src="'http://localhost:3000' + scope.row.img" :preview-src-list="srcList">
						<div slot="error" class="image-slot">
						</div>
					</el-image> -->
					<img :src="'http://localhost:3000' + scope.row.img" alt  style="width:100px"/>
				</template>
			</el-table-column>
			<el-table-column label="是否新品">
				<template slot-scope="scope">
					<el-tag>{{scope.row.status | statusFormat}}</el-tag>
				</template>
			</el-table-column>
            <el-table-column label="是否热卖">
				<template slot-scope="scope">
					<el-tag>{{scope.row.status | statusFormat}}</el-tag>
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
		};
	},
	mounted() {
		this.getList();
	},
	methods: {
		getList() {
			this.$http.get("/catelist", { istree: true }).then((res) => {
				this.tableData = res.data.list;
				console.log(res.data.list);
			});
		},
		handleEdit(index, row) {
			this.$router.push("/cateedit?id=" + row.id);
		},
		confirmDel(row) {
			this.$http.post("/catedelete", { id: row.id }).then((res) => {
				this.tableData = res.data.list;
				console.log(res);
			});
			this.$message({
				message: "删除成功",
				type: "success",
			});
		},
		add() {
			this.$router.push("/goodsadd");
		},
	},
};
</script>

<style scoped>
</style>
