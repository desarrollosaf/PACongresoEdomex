import Link from 'next/link';

type Props = {
    banners: any;
};
const BASE_IMG = 'https://sistema.congresoedomex.gob.mx/'
export default function BannersHomeSection({ banners } : Props) {
    return (
        <div className="w-layout-grid grid-2">
            {banners?.slice().map((item: any, index: any) => (
                <Link key={index} href={`${item?.url}`}>
                    <img src={`${BASE_IMG}/${item?.fotos[0].path}`} loading="lazy" alt="" className="image-13 banner-info" />
                </Link>
            ))
            }   
        </div>
    )
}