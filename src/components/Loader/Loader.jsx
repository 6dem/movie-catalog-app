import cls from "./Loader.module.css"

export const Loader = () => {
    return (
        <div className={cls.backdrop}>
            {/* From Uiverse.io by nawinasokan */}
            <div className={cls.loaderCon}>
                <div style={{ "--i": 0 }} className={cls.pfile}></div>
                <div style={{ "--i": 1 }} className={cls.pfile}></div>
                <div style={{ "--i": 2 }} className={cls.pfile}></div>
                <div style={{ "--i": 3 }} className={cls.pfile}></div>
                <div style={{ "--i": 4 }} className={cls.pfile}></div>
                <div style={{ "--i": 5 }} className={cls.pfile}></div>
            </div>
        </div>
    )
}
