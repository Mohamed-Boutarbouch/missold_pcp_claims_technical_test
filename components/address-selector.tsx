import { Label } from '@/components/ui/label'
import MultipleSelector from '@/components/ui/multi-select'
import { UK_CITIES } from '@/data/uk-cities'

export function MultipleSelect() {
  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label>Multiselect</Label>
      <MultipleSelector
        commandProps={{
          label: 'Select categories'
        }}
        value={UK_CITIES.slice(0, 2)}
        defaultOptions={UK_CITIES}
        placeholder='Select categories'
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className='text-center text-sm'>No results found</p>}
        className='w-full'
      />
    </div>
  )
}
