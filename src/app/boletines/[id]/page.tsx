import BoletinesSection from '@/app/boletines/BoletinesSection';
import { getBoletin, getBoletinesRandom } from '../../service/boletines.api'

export default async function BoletinesPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const boletin = await getBoletin(id);
    const boletines = await getBoletinesRandom();
     return (
        <section className="boletines max_width">
            <div>
                <BoletinesSection
                boletin = {boletin} 
                boletines = {boletines}></BoletinesSection>
            </div>
        </section>
    )
}