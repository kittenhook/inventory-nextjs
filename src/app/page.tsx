import Navbar from "@/components/custom/Navbar";

import StacksCard from "@/components/custom/stacksCard";

export default async function Home() {
	return (
		<div className='mx-[100px] flex flex-col gap-3'>
			<Navbar></Navbar>
			<div>
				<h1 className='text-3xl font-extrabold tracking-tight'>
					Libraries I have used:
				</h1>
				<div className='w-fill grid grid-cols-3 grid-rows-3 gap-6 auto-rows-max'>
					<StacksCard
						imagePath='/images/stacks/ts-logo-256.png'
						libraryName='TypeScript'
						libraryVersion='5.0.0'
						description='A derivative of JavaScript, but with type-safety.'
					></StacksCard>
					<StacksCard
						imagePath='/images/stacks/dr-logo-256.png'
						libraryName='Drizzle ORM'
						libraryVersion='0.38.3'
						description='Object-relational mapping library for interacting with databases.'
					></StacksCard>
					<StacksCard
						imagePath='/images/stacks/tw-logo.svg'
						libraryName='TailwindCSS'
						libraryVersion='5.0.0'
						description='CSS framework packed with classes that can be composed to build any design, directly in your markup.'
					></StacksCard>
				</div>
			</div>
		</div>
	);
}
