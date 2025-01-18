"use client";
import TreeTable from "@/components/custom/tables/treeTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TreeCreateForm from "@/components/custom/forms/trees/treeCreateForm";
import { useEffect, useState } from "react";
import { LoaiGiong } from "@/lib/schema";
import { useAuth } from "@/components/custom/AuthContext";
import ErrorPage from "@/components/custom/Error";

export default function TreePage() {
	const [trees, setTrees] = useState<LoaiGiong[]>([]);
	const [loading, setLoading] = useState(true);
	const { isAuthenticated } = useAuth();
	useEffect(() => {
		if (!isAuthenticated) return;
		(async () => {
			const treesResponse = await fetch("/api/database/trees");
			if (!treesResponse.ok) {
				return;
			}
			const trees = await treesResponse.json();
			setTrees(trees);
			setLoading(false);
		})();
	}, [isAuthenticated, loading]);
	if (loading) return <></>;
	return isAuthenticated ? (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>Tree database</span>
			<Separator />
			<div className='w-full flex justify-end'>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add a record!</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle />
						<TreeCreateForm />
					</DialogContent>
				</Dialog>
			</div>
			<TreeTable trees={trees} />
		</div>
	) : (
		<ErrorPage
			status_code={401}
			error_message='You are not authorized to view this page.'
		/>
	);
}
