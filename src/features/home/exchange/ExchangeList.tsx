import { Loader } from 'components/common/Loader';
import { ExchangeItem } from './ExchangeItem';
import { useExchange } from './use-exchange';

const ExchangeList = () => {
    const [courses, { error, status }] = useExchange();

    return (
        <div data-testid='exchange-list' className='exchange__list'>
            {error && <h4 className='list-error'>Can&apos;t get exchange list</h4>}
            {status === 'loading' && <Loader />}
            {status === 'received' && (
                <>
                    {courses.map((course) => {
                        return <ExchangeItem key={course.from} to={course.to} from={course.from} course={course.course} />;
                    })}
                </>
            )}
        </div>
    );
};
export { ExchangeList };
