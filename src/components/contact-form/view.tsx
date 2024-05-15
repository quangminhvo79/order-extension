import { Box, Stack, Typography } from '@mui/material'
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react'
import { ContactFormViewType } from './types'

const ContactFormView = ({
  address1,
  address2,
  companyName,
  firstname,
  lastname,
  city,
  phone,
  label,
  setAddress1,
  setAddress2,
  setCompanyName,
  setFirstname,
  setLastname,
  setCity,
  setPhone,
  setLabel,
  setDistrict,
  setWard,
  note,
  setNote,
  cities,
  district,
  districts,
  ward,
  wards,
  formRef,
  onSubmit,
  onBack,
  invalid,
}: ContactFormViewType) => {

  return (
    <Box className="p-4">
      <Typography className="px-3 py-2 mb-5 text-2xl font-bold text-white bg-gray-600 rounded-lg">Địa chỉ nhận hàng</Typography>
      <form className="flex flex-col max-w-md gap-4" ref={formRef}>
        <div>
          <div className="block mb-2">
            <Label htmlFor="firstname" className="space-x-1">
              <span>Người nhận</span>
              <span className="text-red-500">*</span>
            </Label>
          </div>
          <Box className="grid grid-cols-2 gap-3">
            <TextInput
              id="firstname"
              type="text"
              required
              value={firstname}
              onChange={ (event) => setFirstname(event.target.value) }
              placeholder="Họ"
              color={(!firstname && invalid) ? 'failure' : 'gray'}
            />
            <TextInput
              id="lastname"
              type="text"
              required
              value={lastname}
              onChange={ (event) => setLastname(event.target.value) }
              placeholder="Tên"
              color={(!lastname && invalid) ? 'failure' : 'gray'}
            />
          </Box>
        </div>

        <div>
          <div className="block mb-2">
            <Label htmlFor="address" className="space-x-1">
              <span>Địa chỉ</span>
              <span className="text-red-500">*</span>
            </Label>
          </div>
          <Box className="grid gap-2 grid-row-2">
            <TextInput
              id="address"
              type="text"
              required
              value={address1}
              onChange={ (event) => setAddress1(event.target.value) }
              placeholder="Số nhà, tên đường"
              color={(!address1 && invalid) ? 'failure' : 'gray'}
            />
            <TextInput
              id="address"
              type="text"
              value={address2}
              onChange={ (event) => setAddress2(event.target.value) }
              placeholder="Chung cư, tòa nhà, tầng, số phòng, ..."
            />
          </Box>
        </div>

        <div>
          <div className="block mb-2">
            <Label htmlFor="province" className="space-x-1">
              <span>Tỉnh Thành</span>
              <span className="text-red-500">*</span>
            </Label>
          </div>
          <Stack className="flex-col space-y-2">
            <Select id="province" required
              onChange={(event) => setCity(event.target.value)}
              value={city}
              color={(!city && invalid) ? 'failure' : 'gray'}
            >
              <option key={null}>Tỉnh/Thành</option>
              {cities.map((province) => <option key={province}>{province}</option>)}
            </Select>
            <Box className="grid grid-cols-2 gap-2">
              <Select id="district" required
                onChange={(event) => setDistrict(event.target.value)}
                value={district}
                color={(!district && invalid) ? 'failure' : 'gray'}
              >
                {districts && districts.map((district) => <option key={district}>{district}</option>)}
              </Select>
              <Select id="ward" required
                onChange={(event) => setWard(event.target.value)}
                value={ward}
                color={(!ward && invalid) ? 'failure' : 'gray'}
              >
                {wards && wards.map((ward) => <option key={ward}>{ward}</option>)}
              </Select>
            </Box>
          </Stack>
        </div>

        <div>
          <div className="block mb-2">
            <Label htmlFor="phone" className="space-x-1">
              <span>Điện thoại</span>
              <span className="text-red-500">*</span>
            </Label>
          </div>
          <TextInput
            id="phone"
            type="phone"
            required
            value={phone}
            onChange={ (event) => setPhone(Number(event.target.value)) }
            color={(!phone && invalid) ? 'failure' : 'gray'}
            placeholder='09xxxxxxxx'
          />
        </div>

        <Box className="grid grid-cols-2 gap-2">
          <div>
            <div className="block mb-2">
              <Label htmlFor="companyName" value="Công ty" />
            </div>
            <TextInput
              id="companyName"
              type="text"
              value={companyName}
              onChange={ (event) => setCompanyName(event.target.value) }
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="label" value="Loại địa chỉ" />
            </div>
            <TextInput
              id="label"
              type="text"
              value={label}
              onChange={ (event) => setLabel(event.target.value) }
            />
          </div>
        </Box>

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
        <Box className="grid grid-cols-2 gap-2">
          <Button onClick={onSubmit} outline gradientDuoTone="greenToBlue">Lưu</Button>
          <Button onClick={onBack} outline gradientDuoTone="purpleToBlue">Quay lại</Button>
        </Box>
      </form>
    </Box>
  )
}

export default ContactFormView
