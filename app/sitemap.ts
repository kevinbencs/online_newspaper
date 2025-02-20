import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const resArt = await fetch(`${process.env.URL}/api/article`, { next: {revalidate: 3600} });
    const dataArt: { art: { title: string, date: string, category: string }[] } = await resArt.json();

    const resCar = await fetch(`${process.env.URL}/api/career`, { next: {revalidate: 3600} });
    const dataCar: { Car: { title: string, date: string }[] } = await resCar.json();

    const resAuth = await fetch(`${process.env.URL}/api/authors`, { next: {revalidate: 3600} });
    const dataAuth: { res: { name: string}[] } = await resAuth.json();

    const resCategory = await fetch(`${process.env.URL}/api/category`, { next: {revalidate: 3600} });
    const dataCategory: { success: { name: string, _id:string}[] } = await resCategory.json();

    const resSearch = await fetch(`${process.env.URL}/api/search/sitemap`, { next: {revalidate: 3600} });
    const dataSearch: { res: { theme: string}[] } = await resSearch.json();

    const ResArray: {
      url: string,
      lastModified: string | Date | undefined,
      changeFrequency: "never" | "daily" | "always" | "hourly" | "weekly" | "monthly" | "yearly" | undefined,
      priority: number | undefined
    }[] = [];

    for (let item of dataCar.Car) {
      ResArray.push({
        url: `${process.env.URL}/carrier/${item.title.replaceAll(' ', '_')}`,
        lastModified: item.date,
        changeFrequency: 'never',
        priority: 0.8,
      })
    }

    for (let item of dataArt.art) {
      ResArray.push({
        url: `${process.env.URL}/${item.category}/${item.date.slice(0, 4)}/${item.date.slice(6, 8)}/${item.date.slice(10, 12)}/${item.title.replaceAll(' ', '_').replace('?','nb20')}`,
        lastModified: item.date,
        changeFrequency: 'daily',
        priority: 1,
      })
    }

    for(let item of dataAuth.res){
      ResArray.push({
        url: `${process.env.URL}/authors/${item.name.replaceAll(' ','_')}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      })
    }

    for(let item of dataCategory.success){
      ResArray.push({
        url: `${process.env.URL}/category/${item.name.replaceAll(' ','').replaceAll('&','_').toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      })
    }

    for(let item of dataSearch.res){
      ResArray.push({
        url: `${process.env.URL}/search?text=${item.theme.replaceAll(' ','_')}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      })
    }



    return [
      {
        url: `${process.env.URL}`,
        lastModified: new Date(),
        changeFrequency: 'always',
        priority: 1,
      },
      {
        url: `${process.env.URL}/signin`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/signup`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/forgotpassword`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/privacypolicy`,
        lastModified: '2024-12-01',
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${process.env.URL}/newsletter`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/newsletter/unsubscribe`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/latest`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: `${process.env.URL}/important`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: `${process.env.URL}/authors`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${process.env.URL}/career`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
      ...ResArray
    ]


  } catch (error) {
    console.log(error)
    return [
      {
        url: `${process.env.URL}`,
        lastModified: new Date(),
        changeFrequency: 'always',
        priority: 1,
      },
      {
        url: `${process.env.URL}/signin`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/signup`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/forgotpassword`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/privacypolicy`,
        lastModified: '2024-12-01',
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${process.env.URL}/newsletter`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/newsletter/unsubscribe`,
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: `${process.env.URL}/latest`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: `${process.env.URL}/important`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: `${process.env.URL}/authors`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${process.env.URL}/career`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
    ]
  }

}