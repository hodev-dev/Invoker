import { Invoker } from '@core/invoker';
import React, { useEffect } from 'react';

export const App = (props: any) => {

	useEffect(() => {
		props.init();
		console.log('run');
	}, []);

	const render = () => {
		return props.server && props.server.map((user: any) => {
			return (
				<h1 key={user.name}>{user.name}</h1>
			)
		});
	}
	return (
		<div suppressHydrationWarning={true}>
			{render()}
			<a href={'/2'}>Click</a>
		</div>
	);
};

Invoker.get((serverData: any) => {
	console.log(serverData);
	Invoker.render(App, serverData);
});





