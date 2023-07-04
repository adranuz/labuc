import { Grid, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import EngineeringIcon from '@mui/icons-material/Engineering'
import PersonIcon from '@mui/icons-material/Person'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

function CustomerContacts ({contacts, readOnly}) {
  console.log(readOnly)
  
  return (
    <>
      <List>
        {contacts?.map(contact => {
          return (
            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                {
                  readOnly && (
                    <TextField
                      margin='normal'
                      fullWidth
                      size='small'
                      label='Tipo'
                      defaultValue={contact?.type === 'com' ? 'Comercial' : 'Tecnología'}
                      disabled={readOnly}
                    />
                  ) || (
                    <FormControl
                      margin='normal'
                      fullWidth
                      size='small'
                    >
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        label='Tipo'
                        defaultValue={contact?.type}
                      >
                        <MenuItem value='com'>Comercial</MenuItem>
                        <MenuItem value='tec'>Tecnología</MenuItem>
                      </Select>
                    </FormControl>
                  )
                }
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  margin='normal'
                  fullWidth
                  size='small'
                  label='Nombre'
                  defaultValue={contact?.name}
                  disabled={readOnly}
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  margin='normal'
                  fullWidth
                  size='small'
                  label='Correo electrónico'
                  defaultValue={contact?.email}
                  disabled={readOnly}
                />
              </Grid>
            </Grid>

            // <ListItem>
            //   <ListItemAvatar>
            //     <Avatar sx={{ bgcolor: useTheme().palette.secondary.light }}>
            //       { contact.type === 'tec' && <EngineeringIcon /> }
            //       { contact.type === 'com' && <SupportAgentIcon /> }
            //       { contact.type !== 'tec' && contact.type !== 'com' && <PersonIcon /> }
            //     </Avatar>
            //   </ListItemAvatar>
            //   <ListItemText primary={contact.name} secondary={contact.email} />
            // </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default CustomerContacts
