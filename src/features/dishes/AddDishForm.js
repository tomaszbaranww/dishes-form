import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDish, getDishesMessage, getDishesStatus } from 'features/dishes/dishesSlice';
import { FormField } from 'components/FormField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from 'styles/AddDishForm.module.scss';
import { timeRegExp } from 'utils/utils';

const schema = yup.object().shape({
    name: yup.string().required('Value is required.'),
    preparation_time: yup.string().matches(timeRegExp, 'Invalid time format.').notOneOf(['00:00:00'], 'Provide the time value.'),
    type: yup.string().required('Value is required.'),
    no_of_slices: yup.number().when('type', {
        is: 'pizza',
        then: () =>
            yup
                .number()
                .transform((value) => (isNaN(value) ? undefined : value))
                .nullable()
                .min(1, 'Value must be grater than or equal to 1.')
                .required('Value is required.'),
    }),
    diameter: yup.number().when('type', {
        is: 'pizza',
        then: () =>
            yup
                .number()
                .transform((value) => (isNaN(value) ? undefined : value))
                .nullable()
                .min(1, 'Value must be grater than or equal to 1.')
                .required('Value is required.'),
    }),
    spiciness_scale: yup.number().when('type', {
        is: 'soup',
        then: () =>
            yup
                .number()
                .transform((value) => (isNaN(value) ? undefined : value))
                .nullable()
                .min(1, 'Value must be grater than or equal to 1.')
                .max(10, 'Value must be less than or equal to 10.')
                .required('Value is required.'),
    }),
    slices_of_bread: yup.number().when('type', {
        is: 'sandwich',
        then: () =>
            yup
                .number()
                .transform((value) => (isNaN(value) ? undefined : value))
                .nullable()
                .min(1, 'Value must be grater than or equal to 1.')
                .required('Value is required.'),
    }),
});

export const AddDishForm = () => {
    const dispatch = useDispatch();
    const status = useSelector(getDishesStatus);
    const message = useSelector(getDishesMessage);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            name: '',
            preparation_time: '00:00:00',
            type: '',
            no_of_slices: 1,
            diameter: 1,
            spiciness_scale: 1,
            slices_of_bread: 1,
        },
    });

    const onSubmit = (data) => {
        try {
            dispatch(addNewDish(data));
            reset();
        } catch (err) {
            console.error(err.message);
        }
    };

    const watchDishType = watch('type');

    return (
        <section>
            <h2 className={styles.addFormTitle}>Add new dish</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.addForm}>
                <FormField register={register} id="name" name="name" label="Dish name" type="text" error={errors.name?.message} />
                <FormField
                    register={register}
                    label="Preparation Time (HH:MM:SS)"
                    type="text"
                    id="preparation_time"
                    name="preparation_time"
                    error={errors.preparation_time?.message}
                />
                <FormField
                    register={register}
                    type="select"
                    options={['pizza', 'soup', 'sandwich']}
                    label="Dish Type"
                    id="type"
                    name="type"
                    error={errors.type?.message}
                />
                {watchDishType === 'pizza' && (
                    <>
                        <FormField
                            register={register}
                            label="Number of slices"
                            type="number"
                            id="no_of_slices"
                            name="no_of_slices"
                            error={errors.no_of_slices?.message}
                        />
                        <FormField
                            register={register}
                            label="Diameter"
                            type="number"
                            id="diameter"
                            name="diameter"
                            step="0.01"
                            error={errors.diameter?.message}
                        />
                    </>
                )}

                {watchDishType === 'soup' && (
                    <>
                        <FormField
                            register={register}
                            label="Spiciness scale (1 - 10)"
                            type="number"
                            id="spiciness_scale"
                            name="spiciness_scale"
                            error={errors.spiciness_scale?.message}
                        />
                    </>
                )}

                {watchDishType === 'sandwich' && (
                    <>
                        <FormField
                            register={register}
                            label="Number of slices"
                            type="number"
                            id="slices_of_bread"
                            name="slices_of_bread"
                            error={errors.slices_of_bread?.message}
                        />
                    </>
                )}
                <button className={styles.addBtn} type="submit">
                    Add
                </button>
                {status && message && (
                    <span className={styles.msg} style={{ color: status === 'failed' ? 'red' : 'green' }}>
                        {message}
                    </span>
                )}
            </form>
        </section>
    );
};
