import {ReactElement, RefObject, useRef} from 'react';
import Aside from '../aside/aside';
import Header from '../header/header';
import {RecoilRoot, useRecoilState} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export default function Layout({children}: {children: ReactElement}) {
	const asideRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<div className="layout">
					<Header asideRef={asideRef} containerRef={containerRef} />
					<Aside asideRef={asideRef} />
					<main className="main">
						<div ref={containerRef} className="container">
							{children}
						</div>
					</main>
				</div>
			</RecoilRoot>
		</QueryClientProvider>
	);
}
