const CreateOrderBtnView = ({
  onSubmit,
}: {
  onSubmit: () => void
}) => {
  return (
    <div>
      <button onClick={onSubmit} style={{
        borderRadius: '5px',
        background: '#ff693c',
        color: 'white',
        width: '128px',
        fontSize: '16px',
        padding: '8px 30px',
      }}>
        Tạo Đơn
      </button>
    </div>
  )

}

export default CreateOrderBtnView
