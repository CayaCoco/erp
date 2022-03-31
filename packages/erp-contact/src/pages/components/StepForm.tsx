import { PersonForm } from '@infini-soft/kitchensink/lib/Components/Forms';
import ProDescriptions from '@ant-design/pro-descriptions';
import { StepsForm } from '@ant-design/pro-form';
import React, { useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useOperations } from '@/hooks/useOperations';
import { off, on, trigger } from '@infini-soft/utils/lib/Events';
import styles from './index.less';
import { columns } from './Columns';
import CategoryList from './Category';

type StepFormModalProps = {
  stepsFormProps?: typeof StepsForm;
  proDescriptionProps?: typeof ProDescriptions;
};

const StepFormModal = ({
  proDescriptionProps,
  stepsFormProps,
}: StepFormModalProps) => {
  const [activeCategoryKey, setCategoryKey] = React.useState<any>();
  const { getCategories } = useCategories();
  const { handleCreate } = useOperations();
  const handleClose = () => setVisible(false);
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState<API.Item>();
  const eventHandler = (payload: any) => {
    setState(payload?.detail);
    setVisible(true);
  };

  useEffect(() => {
    on('ui.open.create', eventHandler);
    return () => off('ui.open.create', eventHandler);
  }, []);

  return (
    <>
      <StepsForm<API.Item>
        {...stepsFormProps}
        onFinish={async (value) => {
          const success = await handleCreate(value);

          if (success) {
            handleClose();
            trigger('ui.list.reload', {});
          }
        }}
      >
        <StepsForm.StepForm<{ name: string }>
          name="Category"
          title="Category"
          className={styles.step}
        >
          <CategoryList
            groupProps={{ onChange: (val: any) => setCategoryKey(val) }}
            list={getCategories()?.map((c) => ({
              title: c.label,
              value: c.label,
            }))}
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm<{ name: string }>
          name="Contact"
          title="Contact"
          className={styles.step}
          onFinish={async () => {
            return true;
          }}
        >
          <PersonForm edit={false} />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{ name: string }>
          name="More information"
          title="More information"
          className={styles.step}
          onFinish={async () => {
            return true;
          }}
        ></StepsForm.StepForm>
        <StepsForm.StepForm<{ name: string }>
          name="Summary"
          title="Summary"
          className={styles.step}
          onFinish={async () => {
            return true;
          }}
        >
          <ProDescriptions<API.Item>
            {...proDescriptionProps}
            column={2}
            title={state?.name}
            request={async () => ({
              data: state || {},
            })}
            params={{
              id: state?.name,
            }}
            columns={columns}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default StepFormModal;
