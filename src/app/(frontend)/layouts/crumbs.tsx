import { Breadcrumbs, Anchor } from '@mantine/core';


const _dummy= [
  { title: 'Main', href: '#' },
  { title: 'Experiments', href: './experiments/' },
]

export default function Crumbs({path}) {
 let items = path.route.map((p, i)=>({title:p[0].toUpperCase()+p.slice(1), href:"../"+path.route.slice(0, i+1).join("/")}))//[ { title: path.page, href: './experiments/' }]
  return (
    <>
      <Breadcrumbs  fz="xs" separator="/" >{items.map((item, index) => (
  <Anchor fz="xs"  p="xs" bdrs="md" href={item.href} key={index}>
    {item.title}
  </Anchor>
))}</Breadcrumbs>

    </>
  );
}