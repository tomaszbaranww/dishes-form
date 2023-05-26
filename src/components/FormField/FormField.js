import styles from 'components/FormField/FormField.module.scss';

export const FormField = ({ label, error, register, id, name, type, options }) => (
    <div className={styles.formField}>
        <label htmlFor={id}>{label}</label>
        {(type === 'text' || type === 'number') && <input id={id} type={type} {...register(name)} />}
        {type === 'select' && (
            <select id={id} {...register(name)}>
                <option value="" hidden>
                    Select dish type
                </option>

                {options.map((dish) => (
                    <option key={dish} value={dish}>
                        {dish}
                    </option>
                ))}
            </select>
        )}
        {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
);
