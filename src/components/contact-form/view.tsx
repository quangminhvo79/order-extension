import { Box, Stack } from '@mui/material'
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react'
import { ContactFormViewType } from './types'

const ContactFormView = ({
  provinces,
  districts,
  wards,
  setProvince,
  setDistrict,
  setWard,
  address,
  recipient,
  phone,
  note,
  setAddress,
  setRecipient,
  setPhone,
  setNote,
  onSubmit,
  formRef,
  province,
  district,
  ward,
}: ContactFormViewType) => {

  return (
    <Box className="w-[400px] p-4">
      <form className="flex flex-col max-w-md gap-4" ref={formRef}>
        <div>
          <div className="block mb-2">
            <Label htmlFor="province" value="Tỉnh Thành" />
          </div>
          <Stack className="flex-col space-y-2">
            <Select id="province" required
              onChange={(event) => setProvince(event.target.value)}
              value={province}
            >
              <option key={null}></option>
              {provinces.map((province) => <option key={province}>{province}</option>)}
            </Select>
            <Select id="district" required
              onChange={(event) => setDistrict(event.target.value)}
              value={district}
            >
              {districts && districts.map((district) => <option key={district}>{district}</option>)}
            </Select>
            <Select id="ward" required
              onChange={(event) => setWard(event.target.value)}
              value={ward}
            >
              {wards && wards.map((ward) => <option key={ward}>{ward}</option>)}
            </Select>
          </Stack>
        </div>
        <div>
          <div className="block mb-2">
            <Label htmlFor="address" value="Địa chỉ" />
          </div>
          <TextInput id="address" type="text" required value={address} onChange={ (event) => setAddress(event.target.value) }/>
        </div>
        <div>
          <div className="block mb-2">
            <Label htmlFor="recipient" value="Người nhận" />
          </div>
          <TextInput id="recipient" type="text" required value={recipient} onChange={ (event) => setRecipient(event.target.value) }/>
        </div>
        <div>
          <div className="block mb-2">
            <Label htmlFor="phone" value="Điện thoại" />
          </div>
          <TextInput id="phone" type="text" required value={phone} onChange={ (event) => setPhone(event.target.value) }/>
        </div>
        <div>
          <div className="block mb-2">
            <Label htmlFor="note" value="Ghi chú" />
          </div>
          <Textarea
            id="note"
            placeholder="Thêm ghi chú"
            rows={4}
            value={note}
            onChange={ (event) => setNote(event.target.value) }/>
        </div>

        <Button type="submit" onClick={onSubmit}>Lưu địa chỉ</Button>
      </form>
    </Box>
  )
}

export default ContactFormView
