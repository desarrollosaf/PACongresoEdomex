import Link from 'next/link';

type Props = {
  banners: any;
};

const BASE_IMG = 'https://congresoedomex.gob.mx/';

export default function BannersHomeSection({ banners } : Props) {
    return (
        <div className="w-layout-grid grid-2">
            <Link href={`${banners[0]?.url}`}>
                  <img src={`${BASE_IMG}/${banners[0]?.fotos[0].path}`} loading="lazy" alt="" className="image-13 banner-info" />
            </Link>
            <Link href={`${banners[1]?.url}`}>
                <img src={`${BASE_IMG}/${banners[1]?.fotos[0].path}`} loading="lazy" alt="" className="image-14 banner-info" />
            </Link>
            <Link href={`${banners[2]?.url}`}>
                <img src={`${BASE_IMG}/${banners[2]?.fotos[0].path}`} loading="lazy" alt="" className="banner-info" />
            </Link>
            <Link href={`${banners[3]?.url}`}>
                <img src={`${BASE_IMG}/${banners[3]?.fotos[0].path}`} loading="lazy" alt="" className="banner-info" />
            </Link>
            
        </div>
    )
}