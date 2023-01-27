import { ExchangeList } from '../../features/home/exchange/ExchangeList';

const Exchange = () => {
    return (
        <div className='exchange exchange_spacing d-lg-flex justify-content-lg-between'>
            <div className='exchange__courses d-flex flex-column'>
                <h3>Exchange rate in internet bank</h3>
                <h4 className='exchange__title'>Currency</h4>
                <ExchangeList />
                <a href='!#' className='exchange__link_colored'>
                    All courses
                </a>
            </div>
            <div className='exchange__update-time d-flex flex-column align-items-start align-items-lg-end'>
                <div>Update every 15 minutes, MSC 09.08.2022</div>
                <svg
                    width='120'
                    height='113'
                    viewBox='0 0 120 113'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M115.936 94.1348V82.6425H107.561V40.4421H115.936V19.631H108.969L60 0L11.0311 19.631H4.0643V40.4421H12.4385V82.6423H4.0643V94.1346H0V112.758H120V94.1346H115.936V94.1348ZM60 7.68258L89.8055 19.6313H30.1945L60 7.68258ZM11.1952 33.3115V26.7621H108.805V33.3115H107.561H88.8799H82.0809H63.3994H56.6004H37.9188H31.1198H12.4385H11.1952ZM100.431 40.4421V82.6423H96.0108V40.4421H100.431ZM88.8799 40.4421V82.6423H82.0809V40.4421H88.8799ZM74.9503 40.4421V82.6423H70.5305V40.4421H74.9503ZM63.3996 40.4421V82.6423H56.6006V40.4421H63.3996ZM49.4698 40.4421V82.6423H45.0499V40.4421H49.4698ZM37.9188 40.4421V82.6423H31.1198V40.4421H37.9188ZM23.9892 40.4421V82.6423H19.5694V40.4421H23.9892ZM11.1952 89.7734H12.4385H31.1201H37.9191H56.6006H63.3996H82.0812H88.8801H107.562H108.805V94.1348H11.1952V89.7734ZM112.869 105.627H7.13086V101.265H112.869V105.627Z'
                        fill='black'
                    />
                </svg>
            </div>
        </div>
    );
};
export { Exchange };
