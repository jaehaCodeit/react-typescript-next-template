import { observer } from 'mobx-react';
import Link from 'next/link';
import './GeneralNav.scss';

const GeneralNav = () => {
	return (
		<div className={`GeneralNav__menu`}>
			<Link href={'/'} as={`/`} prefetch={false}>
				<a className={'GeneralNav__menuEach'}>
					Menu1
				</a>
			</Link>
		
			<Link href={`/`} as={`/`} prefetch={false}>
				<a className={'GeneralNav__menuEach'}>
					Menu2
				</a>
			</Link>
		</div>
	);
};

export default observer(GeneralNav);
